import type { ReactNode } from "react";
import type {
	FlatListProps,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";

export interface ParserOptions {
	styles?: MarkedStyles;
	baseUrl?: string;
	renderer: IRenderer;
}

export interface MarkdownProps extends Partial<ParserOptions> {
	value: string;
	flatListProps?: Omit<
		FlatListProps<ReactNode>,
		"data" | "renderItem" | "horizontal"
	>;
	theme?: UserTheme;
}

export interface IRenderer {
	paragraph(children: ReactNode[], styles?: ViewStyle): ReactNode;
	blockquote(children: ReactNode[], styles?: ViewStyle): ReactNode;
	heading(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	code(
		text: string,
		language?: string,
		containerStyle?: ViewStyle,
		textStyle?: TextStyle,
	): ReactNode;
	hr(styles?: ViewStyle): ReactNode;
	listItem(children: ReactNode[], styles?: ViewStyle): ReactNode;
	list(
		ordered: boolean,
		li: ReactNode[],
		listStyle?: ViewStyle,
		textStyle?: TextStyle,
	): ReactNode;
	escape(text: string, styles?: TextStyle): ReactNode;
	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
	): ReactNode;
	image(uri: string, alt?: string, style?: ImageStyle): ReactNode;
	strong(children: ReactNode[], styles?: TextStyle): ReactNode;
	em(children: ReactNode[], styles?: TextStyle): ReactNode;
	codespan(text: string, styles?: TextStyle): ReactNode;
	br(): ReactNode;
	del(children: ReactNode[], styles?: TextStyle): ReactNode;
	text(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	html(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	linkImage(
		href: string,
		imageUrl: string,
		alt?: string,
		style?: ImageStyle,
	): ReactNode;
}
