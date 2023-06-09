import React, { memo, useCallback } from "react";
import { FlatList, useColorScheme } from "react-native";
import type { MarkdownProps, Token } from "./types";
import { useMarkdownBase } from "../hooks/useMarkdown";
import colors from "../theme/colors";
import type Parser from "./Parser";

const MemoItem = memo(
	({ item, parser }: { item: Token; parser: Parser }) => {
		const elements = parser.parse([item]);
		console.log("render raw", item.raw);
		return <>{elements}</>;
	},
	(prevProps, nextProps) => prevProps.item.raw === nextProps.item.raw,
);

const keyExtractor = (_: Token, index: number) => index.toString();

const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer,
	styles,
	tokenizer,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();

	const { tokens, parser } = useMarkdownBase(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
	});

	const renderItem = useCallback(
		({ item }: { item: Token }) => <MemoItem item={item} parser={parser} />,
		[parser],
	);

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={{
				backgroundColor:
					colorScheme === "light"
						? colors.light.background
						: colors.dark.background,
			}}
			{...flatListProps}
			data={tokens}
			renderItem={renderItem}
		/>
	);
};

export default memo(Markdown);
