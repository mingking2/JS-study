
# 보고서 #2 순수 함수와 비순수 함수

- **순수 함수**: 어떤 외부 상태에 의존하지도 않고 변경하지도 않는, 부수 효과가 없는 함수
- **비순수 함수**: 외부 상태에 의존하거나 외부상태를 변경하는, 부수 효과가 있는 함수

* 부수효과: 외부 상태를 변경하거나 함수로 들어온 인자 상태를 변경하는 것

## 1. 순수 함수
- 동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수이다.

오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 반환값을 만든다.

```javascript
var count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
    return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```
 순수함수가 반환한 결과값을 변수에 재할당해서 상태를 변경한다.



## 2. 비순수 함수
- 외부 상태에 따라 반환값이 달라진다.
- 함수의 외부 상태를 변경하는 부수 효과가 있다.

```javascript
var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수
function increase() {
    return ++count; // 외부 상태에 의존하며 외부 상태를 변경
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```


- **함수형 프로그래밍**은 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수 효과를 최소하해서 불변성을 지향하는 프로그래밍 패러다임이다.
    
1. 결국 순수 함수를 통해 부수 효과를 최대한 억제해 오류를 피하고 프로그램의 안정성을 높이려는 노력의 일환이라 할 수 있다.
    
2. 자바스크립트는 멀티 패러다임 언어이므로 객체지향 프로그래밍뿐만 아니라 함수형 프로그래밍을 적극적으로 활용하고 있다.