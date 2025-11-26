# Call by value와 Call by reference

## Call by value
* 함수 호출 시 메모리에 해당 함수를 위한 임시 공간이 생성되고, 전달되는 변수 값을 복사해서 함수 인자로 전달
```c
#include <stdio.h>

void func(int n) { n = 20; }

int main() {
  int n = 10;
  func(n);
  printf("%d", n); // 10 출력
  return 0;
}
```

## Call by reference
* 함수 호출 시 인자로 전달되는 변수의 레퍼런스를 전달
* 함수 안에서 인자 값이 변경되면, 파라미터로 전달된 객체의 값도 변경됨
```c
#include <stdio.h>

void func(int* n) { *n = 20; }

int main() {
  int n = 10;
  func(&n);
  printf("%d", n); // 20 출력
  return 0;
}
```

## Java의 함수 호출 방식
* 항상 Call by value 방식 사용
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
      Temp temp1=new Temp("temp1");
      func(temp1);
      System.out.println(temp1);
  }
  
  public static void func(Temp temp){
    temp=new Temp("temp2");
  }
  
  static class Temp{
    String name;
    
    public Temp(String name){
      this.name=name;
    }
    
    public String toString(){
      return "Temp name : "+this.name;
    }
  }
}
```
* 파라미터에 객체/값의 주소 값을 복사하여 넘겨주는 방식을 사용하지만, Call by reference는 아님
* 위 코드에서 func에 넘겨주는건 객체의 주소 값이지만 새로운 객체가 할당되면 그 주소에 할당하는게 아니라 새로운 주소에 새로운 객체를 할당하는 call by value 방식
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
      Temp temp1=new Temp("temp1");
      func(temp1);
      System.out.println(temp1);
  }
  
  public static void func(Temp temp){
    // temp=new Temp("temp2");
    temp.setName("temp2");
  }
  
  static class Temp{
    String name;
    
    public Temp(String name){
      this.name=name;
    }
    
    public String toString(){
      return "Temp name : "+this.name;
    }

    public void setName(String name){
        this.name=name;
    }
  }
}
```
* 위 방식 같은 경우는 setName 메서드로 객체의 멤버 변수를 수정하고 있고 변경 사항이 힙 메모리의 실제 객체에 반영됨
* 결론은 새로운 객체의 할당 여부
    * 새 객체 할당 : 참조변수 자체를 다른 주소로 변경 &rarr; 원본에 영향 없음
    * 객체 내용 수정 : 주소는 그대로, 힙 메모리와 실제 객체만 변경 &rarr; 같은 주소를 가진 모든 참조변수에서 변경 반영