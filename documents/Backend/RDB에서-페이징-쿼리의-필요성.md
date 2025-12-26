# RDB에서 페이징 쿼리의 필요성
* 페이징 쿼리는 전체 데이터를 부분적으로 나누어 조회하거나 처리할 때 사용됨
* 데이터를 상대적으로 작은 단위로 나누어 처리하기 때문에 데이터베이스나 애플리케이션의 사용 효율이 증가함
* MySQL에서는 일반적으로 LIMIT, OFFSET 구문을 사용하여 작성
```sql
select *
from comments
limit 500
offset 0;
```
## LIMIT, OFFSET 방식 페이징 쿼리의 단점과 해결 방법
* LIMIT, OFFSET 방식의 페이징 쿼리는 뒤에 있는 데이터를 읽을수록 점점 응답시간이 길어짐
* DBMS에서 지정된 OFFSET 수만큼 모든 레코드를 읽은 이후에 데이터를 가져오기 때문
* OFFSET을 사용하지 않는 페이징 쿼리를 사용함으로써 해결 가능
### 예시
* 특정 기간동안 생성된 댓글 조회하는 쿼리
```sql
select *
from comments
where
    created_at >= ? and created_at < ?
```
* OFFSET을 사용하지 않는 페이징은 이전 페이지의 마지막 데이터 값을 기반으로 다음 페이지를 조회
* 이에 따라 첫 페이지 조회 쿼리와 N 페이지 조회 쿼리가 달라질 수 있음
```sql
-- 첫 페이지
select *
from comments
where
    created_at >= ? and created_at < ?
order by created_at, id
limit 10
```
* 첫 페이지 이후의 페이지는 조회된 페이지의 마지막 값을 기반으로 조회
* 만약 이전 페이지의 마지막 값의 created_at이 '2025-01-01'이고, id가 23이라면
```sql
select *
from comments
where
    -- created_at이 같은 경우 고려
    (created_at = '2025-01-01 00:00:00' and id > 23) or
    -- 마지막 데이터 이후 데이터 조회
    (created_at > '2025-01-01 00:00:00' and created_at < ?)
order by created_at, id
limit 10
```