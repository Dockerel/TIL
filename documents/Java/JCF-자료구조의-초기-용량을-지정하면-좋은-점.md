# JCF 자료구조의 초기 용량을 지정하면 좋은 점
## JCF란?
* Java Collection Framework
* 다수의 데이터를 쉽고 효과적으로 처리하기 위한 표준화된 방법을 제공하는 클래스의 집합
* JCF 이전에는 사용 목적은 동일해도 각 Collection 마다 사용하는 메서드, 문법, 생성자가 달라 혼동하기 쉬웠음

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FvpsPl%2FbtreMDD0tUL%2FAAAAAAAAAAAAAAAAAAAAAOY0W9SN-qHzOM8p1vGHVkmeJj42JNeVkBF66uB9owSB%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DAihdRCzUy803ZfNlp4aO0%252BgUx48%253D)

* 이러한 문제를 해결하기 위해 공통의 인터페이스를 설계하였고, 이를 JCF(Java Collections Framework)라 함
### JCF 도입 전
```java
// 배열 생성 - 크기 고정
String[] names = new String[3];
names[0] = "김철수";
names[1] = "이영희";
names[2] = "박민수";

// 요소 접근
String firstName = names[0];

// 크기 확인
int size = names.length;

// 새 요소 추가 불가 - 배열 재생성 필요
String[] newNames = new String[4];
System.arraycopy(names, 0, newNames, 0, 3);
newNames[3] = "최지훈";

// 요소 삭제 불가 - 직접 구현 필요

// ----------

import java.util.Vector;

// Vector 생성
Vector names = new Vector(); // 제네릭 없음

// 요소 추가 - addElement() 메서드
names.addElement("김철수");
names.addElement("이영희");
names.addElement("박민수");

// 요소 접근 - elementAt() 메서드
String firstName = (String) names.elementAt(0); // 타입 캐스팅 필요

// 크기 확인
int size = names.size();

// 요소 삭제 - removeElementAt() 메서드
names.removeElementAt(1);
```
### JCF 도입 후 (JDK 1.2 이후)
```java
import java.util.List;
import java.util.ArrayList;

// List 생성 - 인터페이스 타입으로 선언
List<String> names = new ArrayList<>(); // 제네릭 사용

// 요소 추가 - add() 메서드 (통일된 인터페이스)
names.add("김철수");
names.add("이영희");
names.add("박민수");

// 요소 접근 - get() 메서드
String firstName = names.get(0); // 타입 캐스팅 불필요

// 크기 확인 - size() 메서드 (통일됨)
int size = names.size();

// 요소 삭제 - remove() 메서드 (통일된 인터페이스)
names.remove(1);

// 다른 Collection으로 쉽게 전환 가능
List<String> linkedNames = new LinkedList<>(names);
```

* 도입 후 List 인터페이스를 통해 통일된 메서드 사용 가능 및 제네릭으로 타입 안정성도 확보됨

## JCF에서 초기 용량을 지정하면 좋은 점
* JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용을 절약할 수 있음

### 실험 코드
```java
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.ArrayList;
import java.util.List;

public class Main {
    private static final int MAX = 5_000_000;

    public static void main(String[] args) {
        testWithDefaultCapacity();
        System.gc();
        try { Thread.sleep(1000); } catch (InterruptedException e) {}

        testWithInitialCapacity();
    }

    private static void testWithDefaultCapacity() {
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

        long beforeUsed = getUsedHeap(memoryMXBean);
        System.out.println("=== Default Capacity Test ===");
        System.out.println("Before: " + beforeUsed + " MB");

        long startTime = System.currentTimeMillis();
        List<String> arr = new ArrayList<>(); // 기본 capacity = 10
        for (int i = 0; i < MAX; i++) {
            arr.add("a");
        }
        long endTime = System.currentTimeMillis();

        long afterUsed = getUsedHeap(memoryMXBean);
        System.out.println("After: " + afterUsed + " MB");
        System.out.println("Memory used: " + (afterUsed - beforeUsed) + " MB");
        System.out.println("Time: " + (endTime - startTime) + " ms");
        System.out.println("Final capacity: ~6,153,400 (33 resizes)\n");
    }

    private static void testWithInitialCapacity() {
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();

        long beforeUsed = getUsedHeap(memoryMXBean);
        System.out.println("=== Initial Capacity Test ===");
        System.out.println("Before: " + beforeUsed + " MB");

        long startTime = System.currentTimeMillis();
        List<String> arr = new ArrayList<>(MAX); // 초기 capacity = 5,000,000
        for (int i = 0; i < MAX; i++) {
            arr.add("a");
        }
        long endTime = System.currentTimeMillis();

        long afterUsed = getUsedHeap(memoryMXBean);
        System.out.println("After: " + afterUsed + " MB");
        System.out.println("Memory used: " + (afterUsed - beforeUsed) + " MB");
        System.out.println("Time: " + (endTime - startTime) + " ms");
        System.out.println("Final capacity: 5,000,000 (0 resizes)");
    }

    private static long getUsedHeap(MemoryMXBean memoryMXBean) {
        MemoryUsage heapUsage = memoryMXBean.getHeapMemoryUsage();
        return heapUsage.getUsed() / 1024 / 1024;
    }
}
```

### 결과
```bash
=== Default Capacity Test ===
Before: 3 MB
After: 81 MB
Memory used: 78 MB
Time: 29 ms
Final capacity: ~6,153,400 (33 resizes)

=== Initial Capacity Test ===
Before: 1 MB
After: 21 MB
Memory used: 20 MB
Time: 19 ms
Final capacity: 5,000,000 (0 resizes)
```

### 기본 용량 사용
* 기본 용량(10)으로 시작한 경우, 용량이 가득 차면 기존 크기의 1.5배로 증가함
```java
// ArrayList.java

private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}
```
* 위와 같이 여러 리사이징이 발생해 최종적으로 약 80MB 사용

### 초기 용량 설정 사용
* 불필요한 리사이징 없이 처음 설정한 크기로 유지되며 약 20MB만 사용함
* 즉 JCF에서 가변 크기의 자료 구조를 사용하는 경우, 초기 용량을 설정하면 리사이징을 줄이고 메모리와 연산 비용 절약 가능

## 로드 팩터와 임계점이란?
* 로드 팩터(load factor)란 특정 크기의 자료 구조에 데이터가 얼마나 적재되었는지를 나타내는 비율
* 임계점(threshold)란 가변적인 크기를 가진 자료구조에서 얼마나 크기를 증가시켜야 하는지를 나타내는 수치
* 로드 팩터와 임계점을 사용하는 이유는 꽉 차기 전에 미리 확장하여 성능 저하를 방지하기 위함

### 예시
* JCF에서 HashMap의 경우에는 내부적으로 배열을 사용하며, 초기 사이즈는 16
* 이때, HashMap의 기준 로드 팩터는 0.75이므로 임계점은 12(capacity * load factor = threshold)이고
* 만약, HashMap 내부 배열의 사이즈가 12를 넘는 경우 내부 배열의 크기를 2배 늘리고, 재해싱을 수행