# JVM에서 GC 객체를 판단하는 기준
* GC(Garbage Collection)
* 자바의 메모리 관리 방법
* JVM의 힙 영역에서 동적으로 할당했던 메모리 중에서 필요없어진 객체를 주기적으로 제거하는 것
* GC는 특정 객체가 사용 중인지 아닌지 판단하기 위해 **도달 가능성(Reachability)**라는 개념 사용
* 특정 객체에 대해 참조가 존재하면 도달 가능, 참조가 존재하지 않는 경우 도달 불가능 상태로 간주 &rarr; GC의 대상이 됨

## 도달 가능성 판단 방법
> ### 객체에 대한 참조 경우
> * 힙 내부 객체 간의 참조
> * 스택 영역의 변수에 의한 참조,
> * JNI에 의해 생성된 객체에 대한 참조 (JNI : Java 코드에서 C/C++ 같은 네이티브 코드를 호출할 때 사용, 네잍티브 스택 영역)
> * 메서드 영역의 정적 변수에 의한 참조
* 힙 내부 객체 간의 참고를 제외한 나머지를 Root Set이라 함
* Root Set으로부터 시작한 참조 사슬에 속한 객체들은 도달할 수 있는 객체
* 이 참조 사슬들과 무관한 객체들은 도달하기 어렵기 때문에 GC의 대상이 됨

## 개발자가 GC 대상 판단에 관여하는 방법
```java
Origin o = new Origin();
WeakReference<Origin> wo = new WeakReference<>(o);
```
* 자바에서는 java.lang.ref 패키지의 SoftReference, WeakReference 클래스를 통해 개발자가 GC 대상 판단에 일정 부분 관여 가능
* SoftReference 객체에 감싸인 객체는 Root Set으로부터 참조가 없는 경우에, 남아있는 힙 메모리의 크기에 따라서 GC 여부가 결정
* WeakReference 객체에 감싸인 객체는 Root Set으로부터 참조가 없는 경우, 바로 GC 대상이 됨