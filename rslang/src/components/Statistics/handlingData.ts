import { dataDate, returnDataOptions } from '../types';

export default function handlingData(dataBase: dataDate[]): returnDataOptions[] {
  return dataBase.map(item => {
    const newDate = new Date(item.date);
    const num = newDate.getDate();
    const month = newDate.getMonth();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    const fullDate = `${(9 < num ? '' : '0') + num}.${
      (9 < month ? '' : '0') + month
    }.${newDate.getFullYear()}`;

    const fullTime = `${(9 < hour ? '' : '0') + hour}${(9 < minute ? ':' : ':0') + minute}`;

    const total = item.correct + item.wrong;
    const percent = Math.ceil((item.correct / total) * 100);

    return {
      fulldate: fullDate,
      time: fullTime,
      new: item.new,
      correct: item.correct,
      wrong: item.wrong,
      percent,
      total,
      quantity: item.quantity,
    };
  });
}
