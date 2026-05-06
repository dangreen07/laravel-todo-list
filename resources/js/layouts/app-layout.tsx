import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { home, login, todoList } from '@/routes';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            {/* Nav */}
            <nav className="w-full">
                <div className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto">
                <Button variant="ghost" asChild>
                    <Link href={home()}>
                        <span className="text-lg font-medium tracking-tight">Todo App</span>
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <div>
                        <Link href={todoList()}>
                            <Button variant="ghost" size="sm">Todo List</Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    ) : (
                        <>
                            <Link href={login()}>
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                        </>
                    )}
                </div>
                </div>
            </nav>
            {children}
        </div>
    );
}
