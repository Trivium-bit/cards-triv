import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'


// тип пропсов обычной кнопки, children в котором хранится название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    callBack?: () => void
    title: string
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        title,
        callBack, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    return (
        <button onClick={callBack}
                className={className}
                {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{title}</button>
    )
}

export default Button
