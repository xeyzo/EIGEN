function reverse(str){
    const string = str.split("").reverse()

    Array.prototype.move = function(from,to){
        this.splice(to,0,this.splice(from,1)[0]);
        return this;
      };

    const data = string.move(0,5)
    const newArr = data.join("")

    return newArr
}



console.log(reverse("NEGIE1"))
