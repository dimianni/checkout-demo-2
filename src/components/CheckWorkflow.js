import Link from 'next/link';

export default function CheckWorkflow() {
    return (
        <section className='bg-slate-200 rounded-xl p-8'>
            <div>
                <p>
                    <Link className='text-blue-500 underline' href="/admin">Admin Panel</Link>
                </p>
                <p>See webhooks <Link rel="noopener noreferrer" target="_blank" className='text-blue-500 underline' href="https://webhook.site/f35dd95f-095a-4f61-b2e6-6b19285b243f">here</Link>.</p>
                <p className='font-bold'>Please carry out a transaction using the iFrame below (Main tab).</p>
            </div>
        </section>
    );
};