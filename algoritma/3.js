const INPUT = ['xc', 'dz', 'bbb', 'dz']  
const QUERY = ['bbb', 'ac', 'dz']

function mergeArray(a,b){
    const newArray= b.concat(a)

    const counts = newArray.reduce((acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
     }), {});

     return counts
}

console.log(mergeArray(INPUT,QUERY))

