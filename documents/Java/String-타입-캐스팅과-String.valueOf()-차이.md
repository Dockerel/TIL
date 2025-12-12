# String 타입 캐스팅과 String.valueOf() 차이
* 두 방식 모두 String 타입으로 타입으로 변환하는 것은 같지만, 동작 방식과 예외 처리에서 차이가 있음

## String 타입 캐스팅
```java
Object intValue = 10;
String str1 = (String) intValue; // ClassCastException

Object nullValue = null;
String str2 = (String) nullValue; // null
str2.concat("maeilmail"); // NullPointerException
```
* value가 String 타입이 아니면 ClassCastException 발생
* value가 null인 경우 null을 반환하기 때문에 사용 시 NPE가 발생할 수 있음

## String.valueOf()
```java
Object intValue = 10;
String str1 = String.valueOf(intValue); // "10"

Object nullValue = null;
String str2 = String.valueOf(nullValue); // "null"
str2.concat("maeilmail"); // "nullmaeilmail"
```
* value가 String 타입이 아니면 value.toString() 호출 후 String으로 변환
* value가 null인 경우 "null" 문자열을 반환