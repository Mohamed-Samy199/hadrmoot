import AddCategory from '@/app/_adminComponents/Category/Add'

export default function page() {
    return (
        <section>
            <div className="text-center">
                <h3 className="heading-admin">إضافة فئة جديدة</h3>
            </div>
            <AddCategory />
        </section>
    )
};