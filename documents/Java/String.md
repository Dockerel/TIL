# String
|분류|String|StringBuffer|StringBuilder|
|---|---|---|---|
|변경|Immutable|Mutable|Mutable|
|동기화||Synchronized 가능 (Thread-safe)|Synchronized 불가능|
|사용|문자열 연산이 적은 환경<br>조회가 많은 멀티 스레드 환경|문자열 연산이 많은 환경<br>멀티 스레드 환경|문자열 연산이 많은 환경<br>싱글 스레드 또는 스레드 신경 안쓰는 환경|

## String 특징
* new 연산을 통해 생성된 인스턴스의 메모리 공간은 변하지 않음
* GC를 통해 제거됨
* 문자열 연산 시 새로 객체를 만드는 오버헤드 존재
* 불변 객체이므로 멀티 스레드에서 동기화를 신경쓸 필요가 없음

## StringBuffer, StringBuilder 특징
* new 연산으로 클래스를 한번만 만듦
* 문자열 연산시 새로 객체를 만들지 않고 크기를 변경시킴
* StringBuffer와 StringBuilder 클래스의 메서드가 동일함
* StringBuffer는 ThreadSafe, StringBuilder는 ThreadSafe하지 않음