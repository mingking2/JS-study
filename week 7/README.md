# TodoList

![image](https://github.com/BangDori/FE-JavaScript-Study/assets/44726494/a865ed4f-f0f6-4396-91ac-3d05a57c94c1)

## 기능
1. 타이머 기능
2. 투두리스트
	- 추가 (Enter, Button)
	- ToggleBox
	- 삭제
	- 수정
	- 중복 체크, 공백 체크
	- 전체 삭제

3. View
	- 모두 보기
	- 남은 일
	- 끝낸 일

## 피드백
<details>
  <summary>2023-06-09</summary>

	- 홈페이지 접속시 바로 시간 업데이트 되도록
	- 수정 시, 엔터키 입력 됐을 때 비활성화
	- 수정 시, 중복
	- 카테고리 버튼 클릭시, 활성화 이벤트 이동 (selected)
	- 설계문제
		- 최상위 app.js -> timer / todos / event
		- 시계 timer.js
		- 할일 기능 -> 추가/토글/수정/삭제 todos.js
		- 렌더 -> All/Active/Completed/Clear (Selected) event.js

</details>
 

## 후기
 - 아직 생성되지 않은 태그에 대한 이벤트리스너
 - 설계가 중요하다
	- todo 의 기능들 : todo.js
	- 렌더링과 이벤트리스너 : event.js
	- 시간 기능 : clock.js
	- 호출하는 init : app.js
 - Map 자료구조로 했는데 다음에는 배열로 해보자
 - html,css가 주어진 상태에서 js만 짜다보니까 재밋다
 - html로 출력할 때 렌더링 메서드가 중요하다.


# 보고서 #4 프로미스
## 사전 지식
- 동기 처리 : 우선순위 작업이 끝날 때까지 기다리는동안 준비상태가 되기 때문에 다른 작업을 할수가 없다.
- 비동기 처리 : 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것
	- 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.
	- 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.
		
		```js
		function getData() {
			var tableData;
			$.get('https://domain.com/products/1', function(response) {
				tableData = response;
			});
			return tableData;
		}	

		console.log(getData()); // undefined
		```

		-  $.get()로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 return tableData;를 실행했기 때문에 getData()의 결과 값은 초기 값을 설정하지 않은 tableData의 값 undefined를 출력합니다.
		<br><br>
- 비동기 처리를 위한 콜백 패턴의 단점
	- 콜백 헬
		- Ajax 예시 : 응답을 반환하도록 수정
			```js
			function getData(callbackFunc) {
				$.get('https://domain.com/products/1',function(response) {
					callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
				});
			}

			getData(function(tableData) {
				console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
			});
			```
		- 콜백 헬 : 콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상
			```js
			$.get('url', function(response) {
				parseValue(response, function(id) {
					auth(id, function(result) {
						display(result, function(text) {
							console.log(text);
						});
					});
				});
			});
			```
	- 에러 처리의 한계
		- 비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러 처리가 곤란하다는 것이다.
			- 비동기 함수는 try...catch...finally 문이 실행되기 전에 먼저 종료된다.
		<br><br>
- 프로미스의 생성
	- Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스(Promise 객체)를 생성한다.
	- ES6에서 도입된 Promise는 호스트 객체가 아닌 ECMAScript 사양에 정의된 표준 빌트인 객체다.
	<br><br>
	- Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다.

	```js
	// GET 요청을 위한 비동기 함수
	const promiseGet = (url) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.send();

			xhr.onload = () => {
				if(xhr.status === 200) {
					// 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
					resolve(JSON.parse(xhr.response));
				} else {
					// 에러 처리를 위해 reject 함수를 호출한다.
					reject(new Error(xhr.status));
				}
			};
		});
	};
	
	// promiseGet 함수는 프로미스를 반환한다.
	PromiseGet('https://jsonplaceholder.typicode.com/posts/1');
	```
	<br><br>
		- 비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성하고 반환한다. 비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행한다.
		- 만약 비동기 처리가 성공하면 비동기 처리 결과를 resolve 함수에 인수로 전달하면서 호출되고, 비동기 처리가 실패하면 에러를 reject 함수에 인수로 전달하면서 호출한다.
	<br><br>
	- 프로미스는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖는다.
		|프로미스의 상태 정보|의미|상태 변경 조건|
		|:---:|:---:|:---:|
		|pending|비동기 처리가 아직 수행되지 않은 상태|프로미스가 생성된 직후 기본 상태|
		|fulfilled|비동기 처리가 수행된 상태(성공)|resolve 함수 호출|
		|rejected|비동기 처리가 수행된 상태(실패)|reject 함수 호출|
		
- 프로미스의 후속 처리 메서드
	- Promise.prototype.then
	- Promise.prototype.catch
	- Promise.prototype.fianlly
- 프로미스의 에러 처리
- 프로미스 체이닝
- 프로미스의 정적 메서드
	- Promise.resolve / Promise.reject
	- Promise.all
	- Promise.race
	- Promise.allSettled
- 마이크로태스트 큐
- fetch