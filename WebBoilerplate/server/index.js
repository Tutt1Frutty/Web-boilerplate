import * as path from "path";
import { createRequire } from "node:module";
import { randomUUID } from 'node:crypto'
import { userValidateDataUtil } from '../src/data/normalize/validate-data.ts'
import { userNormalizeDataUtil } from '../src/data/normalize/users-normalization.js'

const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const dbFile = path.resolve("server/db.json");
const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/add-new-teacher", (req, res) => {
    console.log(req.body.b_date);
    const u = {
        id: randomUUID(),
        full_name: req.body?.full_name ?? "",
        course: req.body?.course ?? "",
        country: req.body?.country ?? "",
        city: req.body?.city ?? "",
        email: req.body?.email ?? "",
        phone: req.body?.phone ?? "",
        gender: req.body?.gender ?? "",
        note: req.body?.note ?? "",
        favorite: false,
        picture_large: req.body?.bg_color
            ? `https://singlecolorimage.com/get/${String(req.body.bg_color).replace("#","")}/100x100`
            : null,
        age: req.body?.age ?? null,
        b_date: String(new Date(req.body.b_date)),
    };

    router.db.get("users").push(u).write();
    res.json({ ok: true, user: u });
});

server.put("/api/set-favourite", (req, res) => {
    const id = String(req.body?.id ?? "");
    const val = !!req.body?.value;
    const found = router.db.get("users").find({ id }).value();
    if (!found) return res.status(404).json({ ok: false, error: "User not found" });
    router.db.get("users").find({ id }).assign({ favorite: val }).write();
    res.json({ ok: true, id, value: val });
});

server.post("/api/fifty-teachers", async (req, res) => {
    const amount = 50;
    const raw = await (await fetch(`https://randomuser.me/api/?results=${amount}`)).json();
    const validated = userValidateDataUtil(userNormalizeDataUtil(raw.results));
    router.db.get("changedIds").push(...validated.changedIds).write();
    router.db.get("users").push(...validated.users).write();
    res.json({ ok: true, added: validated.users.length });
});

server.post("/api/random-teachers", async (req, res) => {
    const amount = Number(req.body?.amount ?? 10);
    const raw = await (await fetch(`https://randomuser.me/api/?results=${amount}`)).json();
    const validated = userValidateDataUtil(userNormalizeDataUtil(raw.results));
    router.db.get("changedIds").push(...validated.changedIds).write();
    router.db.get("users").push(...validated.users).write();
    res.json({ ok: true, added: validated.users.length });
});

server.use(router);
server.listen(5151);
