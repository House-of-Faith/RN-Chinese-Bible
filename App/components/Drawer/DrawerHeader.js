import React from "react"
import styled from "@emotion/native";

export default function DrawerHeader({ testament, onPress }) {
	return (
		<Header>
			<TitleContainer
					selected={testament === "old"}
					onPress={() => onPress("old")}
			>
					<Title selected={testament === "old"}>
							Old T.
					</Title>
			</TitleContainer>
			<TitleContainer
					selected={testament === "new"}
					onPress={() => onPress("new")}
			>
					<Title selected={testament === "new"}>
							New T.
					</Title>
			</TitleContainer>
		</Header>
	);
}

const Header = styled.View(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	marginBottom: 3,
	borderBottomWidth: 1,
	borderBottomColor: theme.border.color,
	paddingBottom: 10,
}));

const TitleContainer = styled.TouchableOpacity(
	({ theme, selected }) => {
			if (!selected)
					return {
							borderBottomWidth: 1,
							borderBottomColor: theme.border.color,
					};
	},
	{
			marginHorizontal: 7,
	}
);

const Title = styled.Text(({ theme, selected }) => ({
	color: selected ? theme.text.card : theme.text.secondary,
	fontSize: 22,
}));