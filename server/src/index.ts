import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import {User} from "../../src/data/normalize/users-normalization";

const app = express();
const PORT = 5151;

const adapter = new JSONFile<{users: User[]}>('./db.json');
const db = new Low<{users: User[]}>(adapter, { users: [] });

app.get('/', async (req, res) => {
	await db.read();
	res.json(db.data);
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
