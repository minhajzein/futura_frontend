import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTaskMutation } from "../../redux/apiSlices/taskApiService";

//===================================================================================

function AddTask() {
	const [addTask, { isLoading, isSuccess }] = useAddTaskMutation();

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			title: Yup.string()
				.required("title is required")
				.min(3, "title is very short")
				.max(40, "title is too long"),
			description: Yup.string().required("add a description"),
		}),
		onSubmit: async values => {
			try {
				const result = await addTask(values);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="mt-5">
				<h1 className="font-serif text-center">Add tasks</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full flex flex-col">
						<label htmlFor="title" className="text-gray-500 text-sm">
							Title
						</label>
						<input
							value={formik.values.title}
							onChange={formik.handleChange}
							className="bg-gray-300 rounded"
							id="title"
							type="text"
							name="title"
						/>
						{formik.errors.title && (
							<p className="text-red-600 text-xs">{formik.errors.title}</p>
						)}
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="description" className="text-gray-500 text-sm">
							description
						</label>
						<textarea
							onChange={formik.handleChange}
							value={formik.values.description}
							name="description"
							className="bg-gray-300 rounded"
							id="description"
						/>
						{formik.errors.descriptoin && (
							<p className="text-red-600 text-xs">{formik.errors.descriptoin}</p>
						)}
					</div>
					<div className="flex mt-2 justify-between">
						<input
							className="bg-red-700 rounded p-1 cursor-pointer"
							type="reset"
							onClick={() => formik.resetForm()}
							value="Discard"
						/>
						{isLoading ? (
							<i className="fa-solid fa-spinner animate-spin"></i>
						) : (
							<input
								className="bg-green-600 rounded py-1 px-2 cursor-pointer"
								type="submit"
								value="Add"
							/>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddTask;
