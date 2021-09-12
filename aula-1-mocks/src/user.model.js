class User{
  constructor({name,id,profession,age}){
    this.id = parseInt(id)
    this.name = name
    this.profession = profession
    this.age = parseInt(age)
  }
}
module.exports = User