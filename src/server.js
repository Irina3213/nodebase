//---------------------
//2-Middleware y Express
//
import express from "express";
import cors from 'cors';
import helmet from "helmet";

const PORT= 3000;

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);
app.use(helmet());
app.use(express.json({limit: '10mb'}));

//GET /students

const myMiddleware= (req, res, next) => {
    console.log(req.url, req.method);
    next();
}
app.use(myMiddleware);

app.use((req, res, next)=> {
    console.log('Second middleware');
    next();
})

app.get('/students', (req, res)=> {
    throw new Error("Whoops, it's an error!");
    // res.status(200).json({msg: 'All students!'});
});

app.get('/students/:studentId', (req, res) => {
    const {studentId} =req.params;
res.status(200).json({msg: `Student with id ${studentId}!`});
});

app.use((req,res)=>{
    res.status(404).json({msg: 'Route not found'});
});

app.use((err, req, res,next) =>{
    console.log(err.message);

    res.status(500).json({
        message: "Internal error",
        error: err.message,
    })
});


app.listen(PORT, ()=>{
    console.log(`Serveis running on http://localhost:${PORT}`);
});
