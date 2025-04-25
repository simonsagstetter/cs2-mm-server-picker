import util from "node:util";
import { exec as child_process_exec } from "node:child_process";
import { PoP } from "../../../../types/pop.types.js";
import sudoPrompt from "sudo-prompt";

const exec = util.promisify(child_process_exec);
export default class Firewall {
    constructor() {}

    async runNetsh(cmd: string) {
        return exec(cmd, { windowsHide: true });
    }
    async runAsAdmin(
        cmd: string,
    ): Promise<{ stdout: string | Buffer<ArrayBufferLike>; stderr: string | Buffer<ArrayBufferLike> }> {
        return new Promise((resolve, reject) => {
            sudoPrompt.exec(cmd, { name: "CS2 Server Picker" }, (error, stdout, stderr) => {
                if (error) {
                    reject({ stdout: stdout ?? "", stderr: error.message });
                } else {
                    resolve({ stdout: stdout ?? "", stderr: stderr ?? "" });
                }
            });
        });
    }

    createBlockRuleCmd({ ips, dir, proto }: { ips: string[]; dir: "in" | "out"; proto: "TCP" | "UDP" }): {
        ruleName: string;
        cmd: string;
    } {
        const ruleName = `CS2_MM_SERVER_PICKER_${dir}_${proto}`;
        const remoteIps = ips.join(",");
        const cmd = [
            `netsh advfirewall firewall add rule`,
            `name="${ruleName}"`,
            `dir=${dir}`,
            `action=block`,
            `protocol=${proto}`,
            `remoteip=${remoteIps}`,
            `profile=domain,private,public`,
        ].join(" ");

        return {
            ruleName,
            cmd,
        };
    }

    createUnblockRuleCmd(ruleName: string): string {
        return `netsh advfirewall firewall delete rule name="${ruleName}"`;
    }

    async blockPops(pops: PoP[]): Promise<
        {
            ruleName: string;
            status: string;
            stderr: string | Buffer<ArrayBufferLike>;
            stdout: string | Buffer<ArrayBufferLike>;
        }[]
    > {
        const ips = pops.flatMap((pop) => pop.relays.map((relay) => relay.ipv4));

        const commands = [
            this.createBlockRuleCmd({ ips, dir: "in", proto: "UDP" }),
            this.createBlockRuleCmd({ ips, dir: "in", proto: "TCP" }),
            this.createBlockRuleCmd({ ips, dir: "out", proto: "UDP" }),
            this.createBlockRuleCmd({ ips, dir: "out", proto: "TCP" }),
        ];

        const cmdScript = commands.map((c) => c.cmd).join(" && ");

        const { stdout, stderr } = await this.runAsAdmin(`powershell -Command ${cmdScript}`);

        return commands.map(({ ruleName }) => ({
            ruleName,
            status: stderr ? "error" : "success",
            stderr,
            stdout,
        }));
    }

    async unblockPops(ruleNames: string[]): Promise<
        {
            ruleName: string;
            status: string;
            stderr: string | Buffer<ArrayBufferLike>;
            stdout: string | Buffer<ArrayBufferLike>;
        }[]
    > {
        const commands = ruleNames.map((ruleName) => this.createUnblockRuleCmd(ruleName)).join(" && ");

        const { stdout, stderr } = await this.runAsAdmin(`powershell -Command ${commands}`);

        return ruleNames.map((ruleName) => ({
            ruleName,
            status: stderr ? "error" : "success",
            stderr,
            stdout,
        }));
    }
}
