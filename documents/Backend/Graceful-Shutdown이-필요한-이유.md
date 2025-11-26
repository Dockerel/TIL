# Graceful Shutdown이 필요한 이유
* 우아한 종료(Graceful Shutdown)
* 애플리케이션 종료 시 바로 종료하는게 아니라, 현재 처리하고 있는 작업 마무리 및 리소스 정리한 후 종료하는 방식
* 일반적으로 SIGTERM 신호를 받으면 새로운 요청은 차단하고 기존 요청을 모두 마무리한 후에 프로세스 종료
* 서버 요청 처리 중 애플리케이션이 종료된다면 트랜잭션 비정상 종료, 데이터 손실, UX 저하 문제가 발생할 수 있음

## SIGTERM과 SIGKILL의 차이
* 둘다 유닉스 및 리눅스 운영체제에서 사용되는 프로세스 종료 시그널
* SIGTERM : 프로세스가 해당 시그널을 핸들링 가능 + 프로세스 종료 전 수행되어야 하는 절차들을 안전하게 수행 가능
* SIGKILL : 프로세스 강제 종료하는 신호

## 스프링 환경에서 Graceful Shutdown을 하는 방법?
```text
server.shutdown=graceful
spring.lifecycle.timeout-per-shutdown-phase=20s // 타임 아웃
```
* 위와 같이 Graceful Shutdown 설정 가능
* 기존에 처리중인 요청에서 데드락이나 무한루프가 발생하면 프로세스가 종료되지 않을 수 있음 &rarr; 타임아웃 설정으로 해결 가능
* 위 설정의 경우 작업들의 완료가 20초를 넘기는 경우 프로세스 바로 종료