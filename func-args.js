
function testFunc() {
    const args = Array.from(arguments);
    console.log(args.length);
    args.forEach( item => {
        console.log('item: ', item);
        console.log('item type: ', typeof item);
    });
}

const func = () => '3';

testFunc('bar', 2, func);

// const testFunc = (one, two, three) => {
//   const args = Array.from(arguments);
//   // console.log(args);
//   console.log(args.length);
//   console.log(args[0]);
//   console.log(args[1]);
//   console.log(args[2]);
//   console.log(args[3]);
//   console.log(args[4]);
// };
//
// const func = () => '3';
//
// // console.log(func());
//
// testFunc('one', 2, func);
