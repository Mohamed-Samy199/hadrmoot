import AddEmployee from "@/app/_adminComponents/Users/AddEmployee";

export default function AddEmployeePage() {
    return (
        <section>
            <div className="text-center">
                <h3 className="heading-admin">تغير حالة مستخدم إلي موظف</h3>
            </div>
            <AddEmployee />
        </section>
    )
};