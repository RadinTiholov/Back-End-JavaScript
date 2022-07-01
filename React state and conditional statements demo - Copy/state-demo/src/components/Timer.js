const React = require('react');

export const Timer = (props) => {
    const [time, setTime] = React.useState(props.startTime);

    setTimeout(() => {
        setTime(time + 1);
    }, 1000)

    return (
        <h1>Timer: {time}</h1>
    )
}