import  { useState, useEffect } from 'react';



export function useDebounce<T>( delay:number, ...args:Array<T> ): Array<T> {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = useState(args);

    useEffect(
        () => {
            // Выставить debouncedValue равным value (переданное значение)
            // после заданной задержки
            const handler = setTimeout(() => {
                setDebouncedValue(args);
            }, delay);

            // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
            // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
            // ... value будет изменено (смотри ниже массив зависимостей).
            // Так мы избегаем изменений debouncedValue, если значение value ...
            // ... поменялось в рамках интервала задержки.
            // Таймаут очищается и стартует снова.
            // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
            // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
            // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем delay ms.
            return () => {
                clearTimeout(handler);
            };
        },
        [args, delay]
    );
    return debouncedValue
}