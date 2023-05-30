const name_ = document.getElementById('name');
const birthday = document.getElementById('birthday');
const gender = document.getElementById('gender');
const today = document.getElementById('today');
const submit = document.getElementById('submit');
const answer = document.getElementById('answer');


const showToday = () => {
    const total = new Date();
    const year = total.getFullYear();
    const month = total.getMonth() + 1;
    const date = total.getDate();

    today.innerHTML += year + "-" + month + "-" + date;
}

submit.addEventListener('click', () => {
    const info = {
        name: name_.value,
        birthday: birthday.value,
        gender: gender.value,
        today: today.innerText.substring(6)
    }

    console.log(info);

     // 행운의 숫자 계산
     const luckyNumber = calculateLuckyNumber(info);

     // 결과 표시
     answer.innerHTML = `Your lucky number is: ${luckyNumber}`;
});

const calculateLuckyNumber = (info) => {
     // 각 정보를 이용하여 행운의 숫자 계산
     let luckyNumber = 0;

     // 이름 길이에 따른 변동값 추가
     luckyNumber += info.name.length;
 
     // 생년월일의 각 자리수를 합하여 변동값 추가
     const birthDate = new Date(info.birthday);
     const birthYear = birthDate.getFullYear();
     const birthMonth = birthDate.getMonth() + 1;
     const birthDay = birthDate.getDate();
     const birthSum = birthYear + birthMonth + birthDay;
     luckyNumber += sumDigits(birthSum);
 
     // 성별에 따른 변동값 추가
     if (info.gender === 'male') {
         luckyNumber += 5;
     } else if (info.gender === 'female') {
         luckyNumber += 10;
     }
 
     // 오늘 날짜의 각 자리수를 합하여 변동값 추가
     const todayDate = new Date(info.today);
     const todayYear = todayDate.getFullYear();
     const todayMonth = todayDate.getMonth() + 1;
     const todayDay = todayDate.getDate();
     const todaySum = todayYear + todayMonth + todayDay;
     luckyNumber += sumDigits(todaySum);
 
     return luckyNumber;
}

const sumDigits = (number) => {
    let sum = 0;
    while (number) {
        sum += number % 10;
        number = Math.floor(number / 10);
    }
    return sum;
}

showToday();