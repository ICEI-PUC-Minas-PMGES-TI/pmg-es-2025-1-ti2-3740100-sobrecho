import Link from 'next/link';
import { Header } from '@/components/common';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShirtIcon } from 'lucide-react';

const navigation = {
    main: [
        { label: 'Sobre', href: '/about' },
        { label: 'Destaques', href: '/featured' },
        { label: 'Gestão', href: '/gestao' }
    ],
    auth: [
        { label: 'Entrar', href: '/sign-in' },
        { label: 'Cadastrar', href: '/sign-up' }
    ]
};

export default function Page() {
    return (
        <>
            <Header className="fixed top-0 left-0 right-0 flex w-full items-center justify-between p-4 z-50 bg-background border-b">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                >
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <ShirtIcon className="size-5" />
                    </div>
                    SoBrechó
                </Link>
                <div className="flex items-center justify-center gap-2">
                    {navigation.main.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                    {navigation.auth.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={
                                index < navigation.auth.length - 1
                                    ? cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')
                                    : buttonVariants({ variant: 'default' })
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                    {}
                </div>
            </Header>

            <div className="pt-20 md:pt-24">
            </div>
        </>
    );
}