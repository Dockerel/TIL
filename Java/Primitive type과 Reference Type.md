# Primitive type과 Reference Type

## Primitive type
![alt text](../Images/자바%20기본형%20타입.png)
* 기본형 타입
* 반드시 사용 전 선언 되어야 함
* 비객체 타입이므로 null 값을 가질 수 없음
* Stack 메모리에 저장
* 만약 기본형 타입에 null을 넣고 싶으면 Wrapper 클래스를 활용해야 함

### Wrapper 클래스
![alt text](../Images/Wrapper%20클래스.png)
* 기본형 타입을 객체로 다루기 위해 사용하는 클래스

## Reference type
* Java에서 최상인 java.lang.Object 클래스를 상속하는 모든 클래스
* class, interface, array, enum 타입이 있음
* 빈 객체를 의미하는 Null 존재
* 런타임 에러가 발생함. 예를 들어 객체나 배열을 Null 값으로 받으면 NullPointException 발생
![alt text](../Images/자바%20참조형%20타입.png)
* Stack에 주소값 저장, 실제 객체는 Heap 영역에 저장
* 박싱 : 기본형 &rarr; 래퍼 클래스
* 언박싱 : 래퍼 클래스 &rarr; 기본형
* JDK 1.5 부터는 오토 박싱 / 오토 언박싱이 지원됨
```java
// 오토 박싱
int 기본형 = 10;
Integer 래퍼 = 기본형;

// 오토 언박싱
Integer 래퍼 = 21;
int 기본형 = 래퍼;
```

## String 클래스
* 참조형에 속하지만 기본형처럼 사용
* 불변하는 객체
* 값을 바꾼다 해도 실제 바뀌는게 아닌 새로운 String 객체를 만들어냄