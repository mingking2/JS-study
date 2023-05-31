# 사이드 프로젝트로 대체
중간고사 시험기간 이슈로 인해 휴학생인 본인은 3학년 1학기 소프트웨어설계 강의를 위한 사이드 프로젝트 TodoList를 하게 된다.


## 아래의 링크를 참조
[TodoList](https://github.com/mingking2/TodoList.git)


# 보고서 #3 프로토타입과 __proto__ 접근자 프로퍼티

자바스크립트는 객체 기반의 프로그래밍 언어이며 **자바스크립트를 이루고 있는 거의 “모든 것”이 객체**다. 원시 타입의 값을 제외한 나머지 값들(함수, 배열. 정규 표현식 등)은 모두 객체다.

## - 객체지향 프로그래밍
**객체지향 프로그래밍**은 프로그래밍 패러다임 중 하나로, 현실 세계의 객체(Object)와 그 객체들 간의 상호작용을 모델링하여 프로그램을 구현하는 방법이다.

객체는 데이터와 해당 데이터를 조작하는 메서드(Method)를 함께 묶어 놓은 것이다. 즉, 객체는 데이터의 속성과 해당 데이터를 처리하기 위한 동작을 한 단위로 묶은 것이다. 이러한 객체들 간에는 상호작용이 발생할 수 있으며, 이를 통해 복잡한 문제를 해결할 수 있다.

객체 지향 프로그래밍에서는 객체를 기반으로 프로그램을 설계하며, 다음과 같은 개념들을 중심으로 프로그래밍이 이루어진다.

캡슐화(Encapsulation): 데이터와 메서드를 하나의 객체 안에 묶어 은닉화한다. 객체의 내부 상태를 직접 접근하지 못하게 하여 객체를 보호하고, 객체 간의 결합도를 낮추어 유지 보수성을 향상시킨다.

상속(Inheritance): 부모 클래스의 특징을 자식 클래스가 물려받는 것으로, 자식 클래스는 부모 클래스의 특징을 그대로 물려받으며, 추가로 자신의 특징을 추가할 수 있다. 이를 통해 코드의 재사용성과 유지보수성을 높일 수 있다.

다형성(Polymorphism): 같은 이름의 메서드나 연산자가 서로 다른 기능을 수행할 수 있는 것을 의미한다. 이를 통해 코드의 가독성과 유연성을 높일 수 있다.


## - 상속과 프로토타입
자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 
중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다.

* 기존의 방법

```javascript
// 생성자 함수
function Cicrle(radius) {
    this.radius = radius;
    this.getArea = function () {
        return Math.PI * this.radius ** 2;
    };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);

// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592
console.log(circle2.getArea()); // 12.566370
```
 동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메몰를 불필요하게 낭비한다. 또한 인스턴스를 생성할 때마다 메서드를 생성하므로 퍼포먼스에도 악영향을 준다.



* 상속을 통해 불필요한 중복을 제거한다. **자바스크립트는 프로토타입을 기반으로 상속을 구현한다.**

```javascript
// 생성자 함수
function Cicrle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다. 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592
console.log(circle2.getArea()); // 12.566370
```
 Circle 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 Circle, prototype의 모든 프로퍼티와 메서드를 상속받는다.



## - 프로토타입 객체
프로토타입 객체란 어떤 객체의 상위(부모) 객체의 역할을 한다.
하위 객체(인스턴스,함수,객체 등)는 부모 객체(프로토타입)의 프로퍼티를 자유롭게 사용할 수 있다.

모든 객체는 [[Prototype]] 내부 슬롯을 가지고 있다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 
즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.

부모 객체(프로토타입 객체)를 [[Prototype]]이라는 슬롯을 통해 참조할 수 있다.
모든 객체는 __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다.


### - __proto__는 접근자 프로퍼티다.

접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 대 사용하는 접근자 함수, 즉 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

Object.prototype의 접근자 프로퍼티인 __proto__는 getter/setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.



### - __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.

```javascript
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: f, set: f, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); true
```


### - __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

[[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다.

```javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```
 **프로토타입 체인**은 단방향 링크드 리스트로 구현되어야 한다. 즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다.

[그림 19-18 프로토타입 체인](./image/%EA%B7%B8%EB%A6%BC%2019-18%20%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%20%EC%B2%B4%EC%9D%B8.png)

 -> 자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조에 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이 한다.

 -> 프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다. Object.prototype을 프로토타입 체인의 종점이라 한다.

 -> 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색한다. 다시 말해, 자바스크립트 엔진은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색한다.따라서 **프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘**이다.

 -> 이에 반해, 프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다. 다시 말해, 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색한다. 따라서 **스코프 체인은 식별자 검색을 위한 메커니즘**이다.

 ==>> 스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다.



### - __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

모든 객체가 __proto__ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.

```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```
 __proto__ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

```javascript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object. setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```