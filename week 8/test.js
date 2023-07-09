// // numbers 배열 선언
// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const newNumbers = [];


// for (let i = 0; i < numbers.length; i += 3) {
//     newNumbers.push(numbers[i]*numbers[i]);
// }


// console.log(newNumbers); // 실행 결과: [0, 9, 36, 81]


// 다음은 1사분면에 있는 점을 골라 각 점과 원점과의 거리의 합을 구하는 코드입니다.
// 아래의 코드를 for문을 이용하기 보단, Array와 Method를 활용하여 최적화 해주세요.
// const points = [
//     [1, -1],
//     [5, 10],
//     [10, -2],
//     [-3, -5],
//     [-10, 9],
//     [6, 7],
// ];

// let sum = 0;
// let count = 0;

// points.forEach((point) => {
//     console.log(point);
//     const [x, y] = point;


//     // 1사분면에 있는 값만,
//     if (x > 0 && y > 0) {
//         // 원점과의 거리의 합을 더해서,
//         sum += Math.sqrt(x * x + y * y);
//         count++;
//     }

//     // 5개면 그만,
//     if (count === 5) {
//         return;
//     }

// });


// console.log(sum);


