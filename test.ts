const kv = await Deno.openKv();
const atomic = kv.atomic();

for await (const { key } of kv.list({ prefix: [] })) {
	atomic.delete(key);
}

await atomic.commit();
