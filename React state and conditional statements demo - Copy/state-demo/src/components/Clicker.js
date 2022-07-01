const React = require('react');

export const Clicker = () => {
    const [count, setCount] = React.useState(0);

    function increaseCount(e) {
        setCount(count + 1)
    }
    function decreaseCount(e) {
        setCount(count - 1)
    }
    function clearCount(){
        setCount(0)
    }

    let counterTitle = ''
    if (count === 0) {
        counterTitle = 'Counter';
    }
    else if (count < 10) {
        counterTitle = 'Counter';
    }
    else if (count < 20) {
        counterTitle = 'Mega Counter';
    }
    else if (count < 30) {
        counterTitle = 'Ultra Counter';
    }
    else if (count < 50) {
        counterTitle = 'Giga Chad Counter';
    }
    else {
        counterTitle = 'Super mega ultra Counter';
    }
    return (
        <>
            <button className='btn btn-primary' onClick={increaseCount}>
                <h1>+</h1>
            </button>
            <h1>{counterTitle}: [{count}]</h1>
            <button className='btn btn-primary' onClick={decreaseCount}>
                <h1>-</h1>
            </button>
            <button className='btn btn-primary' onClick={clearCount}>
                <h1>Clear</h1>
            </button>
        </>
    )
} 