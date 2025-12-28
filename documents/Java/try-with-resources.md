# try-with-resources

* 커넥션, 입출력 스트림 등과 같은 자원을 사용한 후 자동으로 해제하는 기능
* java 7 부터 도입되었고, 자원 해제로 성능 문제 및 메모리 누수 방지 가능
* try-with-resources가 정상적으로 작동하려면 `AutoClosable` 인터페이스를 구현한 객체를 사용해야 하며, `try()` 괄호 내에서 변수를 선언해야 함
```java
try (BufferedReader br = new BufferedReader(new FileReader("path"))) {
    return br.readLine();
} catch (IOException e) {
    return null;
}
```

## try-catch-finally 대신 try-with-resources를 사용해야 하는 이유
```java
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("path"));
    return br.readLine();
} catch (IOException e) {
    return null;
} finally {
    if (br != null) {
        try {
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
* try-catch-finally 사용 시 finally 블록에서 `close()`를 명시적으로 호출해야 함
* `close()` 호출을 누락하거나 이 과정에서 다른 예외가 또 발생하면 예외 처리가 복잡해짐
* 또한 여러 개의 자원을 다를 경우, 먼저 호출한 자원의 `close()`에서 예외가 발생하면 다음 자원의 `close()` 호출을 위해서 추가적인 try-catch-finally가 필요하기 때문에 가독성이 떨어지고 실수할 가능성이 높음

### try-with-resources를 사용하면
* try 블록이 종료될 때 `close()`를 자동으로 호출해서 자원을 해제
* finally 블록 없이도 자원을 안전하게 정리하기 때문에 코드가 간결해짐
* try 문에서 여러 자원을 선언하면, 선언된 반대 순서로 자동 해제됨

## Suppressed Exception
* Suppressed Exception이란 억제된 예외로, 예외가 발생했지만 무시되는 예외를 의미
* try-with-resources는 `close()` 과정에서 발생한 예외를 Suppressed Exception으로 관리함
```java
class CustomResource implements AutoCloseable {
    
    @Override
    public void close() throws Exception {
        throw new Exception("Close Exception 발생");
    }

    void process() throws Exception {
        throw new Exception("Primary Exception 발생");
    }
}

public class Main {
    
    public static void main(String[] args) throws Exception {
        try (CustomResource resource = new CustomResource()) {
            resource.process();
        }
    }
}

Exception in thread "main" java.lang.Exception: Primary Exception 발생
    at CustomResource.process(CustomResource.java:9)
    at Main.main(Main.java:5)
    Suppressed: java.lang.Exception: Close Exception 발생
        at CustomResource.close(CustomResource.java:5)
        at Main.main(Main.java:4)
```
* Suppressed Exception를 사용하면 원래 예외(Primary Exception)을 유지하면서 추가 예외도 함께 추적 가능
* try-catch-finally는 `close()`를 호출할 때 예외가 발생하면 원래 예외가 사라지고 `close()`에서 발생한 예외만 남을 수 있음
```java
public class Main {
    
    public static void main(String[] args) throws Exception {
        CustomResource resource = null;
        try {
            resource = new CustomResource();
            resource.process();
        } finally {
            if (resource != null) {
                resource.close();
            }
        }
    }
}
Exception in thread "main" java.lang.Exception: Close Exception 발생
    at CustomResource.close(CustomResource.java:5)
    at Main.main(Main.java:16)
```
* 이처럼 원래 예외가 사라지면 디버깅이 어려워질 수 있음
* Throwable의 `addSuppressed()`로 최종적으로 던질 예외를 제외한 예외들을 억제된 예외로 추가 가능
* 하지만 코드가 더욱 복잡해지기 때문에 try-with-resources를 사용하는 것이 좋음