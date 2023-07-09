# 강병준의 JS 마지막 테스트

## 주제 : Array Prototype, asynchronous, API 통신

### 문제 1. (15점)

---

자바스크립트의 버전은 ES7, ES8, ES9, … 등등 이전의 기능을 보완하고 새로운 기능을 도입하는 업데이트가 꾸준하게 이루어 지고 있으며, 현재는 ECMA2023 버전까지 업데이트가 되었다. 그리고 우리는 ECMAScript2015를 ES6라고 하며, ES6 이후 버전을 통칭하여 “ES6+” 라고 하기로 약속하였다.

ES6+ 이후에 도입된 기능, 바뀐 문법에는 어떤 것이 있을까? 아는 대로 적어주세요.

- 화살표 함수가 추가되었어요! 
- 원래 상속에 관해서 프로퍼티엿는디 class 개념이 추가되었어요!
- 콜백 헬 개선을 위한 프로미스 개념이 추가되었어요!
- 아마 async/await 도 추가됫어용


### 📌 문제 2. (40점)

---

Array 배열의 내장 메서드를 얼마나 잘 활용할 수 있을지에 대한 문제입니다. 아래 2문제를 확인해 주세요.
- **문제 1-1. (20점)**
    
    아래 문제의 numbers 배열을 수정하여 다음의 실행 결과가 출력될 수 있도록 newNumbers 배열을 생성하는 코드를 작성해주세요.
    
    ```jsx
    // numbers 배열 선언
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newNumbers = [];

    for (let i = 0; i < numbers.length; i += 3) {
      newNumbers.push(numbers[i]*numbers[i]);
    }

    console.log(newNumbers); // 실행 결과: [0, 9, 36, 81]
    ```

    
- **문제 1-2. (20점)**
    
    아래 코드는 for loop문을 이용해 1사분면에 있는 점을 골라 각 점과 원점과의 거리의 합을 구하는 코드입니다. 거리의 합을 구할 때 for loop문을 사용하지 않고, Array의 내장 메서드를 활용하여 거리의 합이 출력될 수 있도록 수정해주세요.
    
    ```jsx
    // 다음은 1사분면에 있는 점을 골라 각 점과 원점과의 거리의 합을 구하는 코드입니다.
    // 아래의 코드를 for문을 이용하기 보단, Array와 Method를 활용하여 최적화 해주세요.
    const points = [
      [1, -1],
      [5, 10],
      [10, -2],
      [-3, -5],
      [-10, 9],
      [6, 7],
    ];
    
    let sum = 0;
    let count = 0;
    
    points.forEach((point) => {
      console.log(point);
      const [x, y] = point;


      // 1사분면에 있는 값만,
      if (x > 0 && y > 0) {
          // 원점과의 거리의 합을 더해서,
          sum += Math.sqrt(x * x + y * y);
          count++;
      }

      // 5개면 그만,
      if (count === 5) {
          return;
      }

    });
    
    console.log(sum);
    ```

### 📌 문제 3. (45점)

---

비동기 통신에 대해 얼마나 이해하고 있는지에 대한 문제입니다. 아래 3문제를 확인해 주세요.

- **문제 2-1. (15점)**
    
    callback 함수만을 사용하여, 1초마다 값이 10씩 증가되도록 코드를 구현하세요. (EndPoint: 50)
    
    
- **문제 2-2. (15점)**
    
    promise 을 사용하여, 1초마다 값이 10씩 증가되도록 코드를 구현하세요. (EndPoint: 50)
    
    
- **문제 2-3. (15점)**
    
    async/await를 사용하여, 1초마다 값이 10씩 증가되도록 코드를 구현하세요. (EndPoint: 50)
    
   


    ### 📌 문제 4. (40점)

---

API 통신에 대해 얼마나 잘 이해하고 있는지를 확인하기 위한 문제입니다. 

[API Documentation - YTS YIFY](https://yts.mx/api#list_movies)

위 홈페이지는 **Movie Database API** 제공하는 웹 서비스로 무료로 영화 데이터를 받을 수 있습니다. **List Movies Section**을 확인하여 영화 데이터를 받아와서 화면에 출력해주세요.

아래 제공 데이터의 자바스크립트 파일을 확인해보면 문제 ①, ②에 대해 주석으로 표시해 두었습니다.

- **제공 데이터**
    - **html**
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script defer src="./news.js"></script>
            <style>
              body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
        
              .movies {
                width: 900px;
                margin: 0 auto;
                padding: 0;
        
                text-align: center;
              }
        
              .movie {
                padding: 0 0 8px;
                border-bottom: 1px solid gray;
                font-size: 12px;
              }
        
              .movie + .movie {
                padding: 8px 0;
              }
        
              h2 {
                margin-bottom: 24px;
              }
            </style>
            <title>Document</title>
          </head>
          <body>
            <button style="cursor: pointer">영화 불러오기</button>
            <div class="movies">
              <!-- 뉴스 기사가 들어골 공간 -->
            </div>
          </body>
        </html>
        ```
        
    - **js**
        
        ```jsx
        const button = document.querySelector("button");
        const box = document.querySelector(".movies");
        
        async function getMovies() {
          box.textContent = "Loading ...";
        
        	// ① 영화 데이터를 받아오는 코드를 작성해주세요.
          const movies = _____________________
        
          box.textContent = "";
          makeElement(movies);
        }
        
        function makeElement(movies) {
          // forEach 함수 활용
          movies.forEach((movie) => {
            const div = document.createElement("div");
            const backgroundImage = document.createElement("img");
            const h2 = document.createElement("h2");
            const p = document.createElement("p");
        
            div.className = "movie";
            backgroundImage.style.width = "180px";
        
        		② 영화 데이터를 구조 분해 할당을 이용해서 분해한 후, 아래 삽입해주세요..
        		const {_____________________} = movies;
        
            backgroundImage.src = _____________________;
            h2.textContent = _____________________;
            p.textContent = _____________________ || "Summary does not exist";
        
            div.append(backgroundImage);
            div.appendChild(h2);
            div.appendChild(p);
            box.append(div);
          });
        }
        
        button.addEventListener("click", getMovies);
        ```
        
- **완성된 예제**