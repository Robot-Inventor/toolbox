import { Link, type MetaDescriptor } from "react-router";
import { IconCard } from "../components/IconCard";
import type { ReactNode } from "react";
import { TOOL_LIST } from "../toolList";
import { ToolName } from "../components/ToolName";
import { listWrapperStyles } from "./Home.css";

const meta = () =>
    [
        {
            title: "ツール一覧 | Toolbox"
        }
    ] as const satisfies MetaDescriptor[];

const Home = (): ReactNode => (
    <>
        <ToolName>ツール一覧</ToolName>
        <div className={listWrapperStyles}>
            {TOOL_LIST.map(({ icon, link, name }) => (
                <Link to={link} key={link}>
                    <IconCard icon={icon} title={name} />
                </Link>
            ))}
        </div>
    </>
);

export default Home;
export { meta };
