import { DiscordSnowflake as Snowflake } from "@sapphire/snowflake";

export function snowflake() {
	return String(Snowflake.generate());
}
