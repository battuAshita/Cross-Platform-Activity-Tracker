import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import activity from './routes/activity.routes.js';
import app_usage from './routes/app.routes.js';
import root from './routes/root.routes.js';
import user from './routes/user.routes.js';

dotenv.config({ path: `./dev.env` });
const app = express();

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 8080;
const mongoUrl = process.env.mongodb;

// Connect to the database
mongoose.connect(
	mongoUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if (err) {
			console.log("Couldn't connect to MongoDB");
			return console.error(err);
		}
		console.log(`MongoDB Connected: ${mongoUrl}`);
	},
);

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', root);
app.use('/users', user);
app.use('/activities', activity);
app.use('/apps', app_usage);

app.listen(port, hostname, function () {
	console.log(`Nodejs server running at http://${hostname}:${port}/`);
});
