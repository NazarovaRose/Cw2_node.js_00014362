const express = require('express')
const app = express()
const fs =require('fs')


app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/create', (req, res)=>{
  res.render('create')
})
app.post('/create',(req,res)=>{
  const name=req.body.name
  const age=req.body.age

  if (name.trim() === '' || age.trim()=== ''){
    res.render('create', {error: true})
}
  else{
  fs.readFile('./data/students.json',(err,data)=>{
    if (err) throw err
    
    const students = JSON.parse(data) 
    students.push({
      id:id(),
      name:name,
      age:age
    })


    fs.writeFile('./data/students.json', JSON.stringify(students), err=>{
      if(err) throw err
     res.render('create',{ success:true })

    })
  })
}

})

  

app.get('/students',(req,res)=>{
  fs.readFile('./data/students.json',(err,data)=>{
    if (err) throw err
    
    const students = JSON.parse(data) 
    res.render('students', {students: students})
  })    

})
app.get('/:id/delete', (req, res) =>{
  const id = req.params.id

  fs.readFile('./data/students.json', (err, data)=>{
    if(err) throw err

    const  students = JSON.parse(data)
    const filteredstudents = students.filter(student=> student.id != id)
    fs.writeFile('./data/students.json', JSON.stringify(filteredstudents), (err)=>{
      if(err) throw err

      res.render('students', {students: filteredstudents, deleted:true})
    })
  })
})
//app.listeners()

app.listen(3030, err =>{
  if(err)console.log(err)
  console.log('Server is running on port 3030')
})

function id (){
  return'_'+Math.random().toString(36).substr(2,9)
}

