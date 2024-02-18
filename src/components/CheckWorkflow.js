import Link from 'next/link';

export default function CheckWorkflow() {
    return (
        <section className='bg-slate-200 rounded-xl p-8'>
            <div>
                <p>
                    <Link className='text-blue-900 underline' href="/admin">Admin Panel</Link>
                </p>
            </div>
        </section>
    );
};