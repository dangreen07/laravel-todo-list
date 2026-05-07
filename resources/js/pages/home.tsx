import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { login, register, todoList } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col">
                
                {/* Hero */}
                <main className="w-full flex-1">
                    <div className="max-w-5xl px-8 pt-28 pb-40 mx-auto">
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-semibold tracking-tight leading-snug mb-4">
                            A todo list that stays out of your way.
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-10">
                            No clutter, no noise. Just your tasks, clearly laid out, ready to get done.
                        </p>

                        {auth.user ? (
                            <Link href={todoList()}>
                                <Button size="lg">Open your todo list</Button>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                {canRegister && (
                                    <Link href={register()}>
                                        <Button size="lg">Get started</Button>
                                    </Link>
                                )}
                                <Link href={login()}>
                                    <Button size="lg" variant="ghost" className="text-zinc-500 dark:text-zinc-400">
                                        Sign in
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-zinc-100 dark:border-zinc-900">
                    <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
                        <span className="text-xs text-zinc-400 dark:text-zinc-600">
                            &copy; {new Date().getFullYear()} Tasks
                        </span>
                        <div className="flex items-center gap-6 text-xs text-zinc-400 dark:text-zinc-600">
                            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}