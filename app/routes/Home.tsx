/** @jsxImportSource @emotion/react */
import { IconCard } from "../components/IconCard";
import { Link } from "react-router";
import { TOOL_LIST } from "../toolList";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";
import { memo } from "react";

const listWrapperStyles = css({
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(2, 1fr)"
});

const Home = memo(() => (
    <>
        <ToolName>ツール一覧</ToolName>
        <div css={listWrapperStyles}>
            {TOOL_LIST.map(({ icon, link, name }) => (
                <Link to={link} key={link}>
                    <IconCard icon={icon} title={name} />
                </Link>
            ))}
        </div>
    </>
));

export default Home;
