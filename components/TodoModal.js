import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";
const TodoModal = ({ list, setListVisible, updateList }) => {
	const [newTodo, setNewTodo] = useState();
	const taskCount = list.todos.length;
	const completedCount = list.todos.filter((todo) => todo.completed).length;

	function toggleTodoCompleted(index) {
		list.todos[index].completed = !list.todos[index].completed;
		updateList(list);
		// console.log(list.id);
	}

	function addTodo() {
		list.todos.push({ title: newTodo, completed: false });
		updateList(list);
		setNewTodo("");

		Keyboard.dismiss();
	}

	function renderTodo(todo, index) {
		return (
			<View style={styles.todoContainer}>
				<TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
					<Ionicons
						name={todo?.completed ? "ios-square" : "ios-square-outline"}
						size={24}
						color={colors.gray}
						style={{ width: 32 }}
					/>
				</TouchableOpacity>
				<Text
					style={[
						styles.todo,
						{
							textDecorationLine: todo?.completed ? "line-through" : "none",
							color: todo?.completed ? colors.gray : colors.black,
						},
					]}
				>
					{todo?.title}
				</Text>
			</View>
		);
	}
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<SafeAreaView style={styles.container}>
				<TouchableOpacity
					style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
					onPress={() => setListVisible(false)}
				>
					<AntDesign name="close" size={24} color={colors.black} />
				</TouchableOpacity>

				<View
					style={[
						styles.section,
						styles.header,
						{ borderBottomColor: list.color },
					]}
				>
					<View>
						<Text style={styles.title}>{list.name}</Text>
						<Text style={styles.taskCount}>
							{completedCount} of {taskCount} tasks
						</Text>
					</View>
				</View>
				<View style={[styles.section, { flex: 3 }]}>
					<FlatList
						data={list.todos}
						keyExtractor={(item) => item.title}
						contentContainerStyle={{
							paddingHorizontal: 32,
							paddingVertical: 64,
						}}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => renderTodo(item, index)}
					/>
				</View>
				<View style={[styles.section, styles.footer]}>
					<TextInput
						style={[styles.input, { borderColor: list.color }]}
						onChangeText={(text) => setNewTodo(text)}
						value={newTodo}
					/>
					<TouchableOpacity
						style={[styles.addTodo, { backgroundColor: list.color }]}
						onPress={() => addTodo()}
					>
						<AntDesign name="plus" size={16} color={colors.white} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default TodoModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	section: {
		flex: 1,
		alignSelf: "stretch",
	},
	header: {
		justifyContent: "flex-end",
		marginLeft: 64,
		borderBottomWidth: 3,
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
		color: colors.black,
	},
	taskCount: {
		marginTop: 4,
		marginBottom: 16,
		color: colors.gray,
		fontWeight: "600",
	},
	footer: {
		paddingHorizontal: 32,
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		flex: 1,
		height: 48,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 6,
		marginRight: 8,
		paddingHorizontal: 8,
	},
	addTodo: {
		borderRadius: 4,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	todoContainer: {
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	todo: {
		color: colors.black,
		fontWeight: "700",
		fontSize: 16,
	},
});
