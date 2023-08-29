import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";

const AddListModal = ({ setModalVisible, addList }) => {
	const backgroundColors = [
		"#5cd859",
		"#24a6d9",
		"#595bd9",
		"#8022d9",
		"#d159d8",
		"#d85963",
		"#d88559",
	];
	const [title, setTitle] = useState("");
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);

	function renderColor() {
		return backgroundColors.map((color) => {
			return (
				<TouchableOpacity
					key={color}
					style={[styles.colorSelect, { backgroundColor: color }]}
					onPress={() => setBackgroundColor(color)}
				/>
			);
		});
	}

	function createTodo() {
		// {
		// 	title
		// 		? tempData.push({ name: title, color: backgroundColor, todos: [] })
		// 		: null;
		// }

		const list = { name: title, color: backgroundColor };
		addList(list);
		setModalVisible(false);
	}
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<TouchableOpacity
				style={{ position: "absolute", top: 64, right: 32 }}
				onPress={() => setModalVisible(false)}
			>
				<AntDesign name="close" size={24} color={colors.black} />
			</TouchableOpacity>

			<View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
				<Text style={styles.title}>create Todo List</Text>
				<TextInput
					style={styles.input}
					placeholder="List Name"
					onChangeText={(text) => setTitle(text)}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 12,
					}}
				>
					{renderColor()}
				</View>

				<TouchableOpacity
					style={[styles.create, { backgroundColor: backgroundColor }]}
					onPress={() => createTodo()}
				>
					<Text style={{ color: colors.white, fontWeight: "600" }}>Create</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default AddListModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: colors.black,
		alignSelf: "center",
		marginBottom: 16,
	},
	input: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.blue,
		borderRadius: 50,
		marginTop: 8,
		paddingHorizontal: 16,
		fontSize: 18,
	},
	create: {
		marginTop: 24,
		height: 50,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	colorSelect: {
		width: 30,
		height: 30,
		borderRadius: 4,
	},
});
