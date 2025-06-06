'use client';
import { Button } from '@/components/ui';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Loader2Icon } from 'lucide-react';

interface IStepButtonsProps {
	current: number;
	total: number;
	prev: () => void;
	next: () => void;
	isComplete: boolean;
	loading: boolean;
	onSubmit: () => void;
}

export function StepButtons({
	current,
	total,
	prev,
	next,
	isComplete,
	loading,
	onSubmit
}: IStepButtonsProps) {
	return (
		<div className="flex justify-between pt-4">
			{current > 1 && (
				<Button type="button" variant="secondary" onClick={prev}>
					<ChevronLeft className="h-4 w-4" />
					Voltar
				</Button>
			)}

			{current < total ? (
				<Button
					type="button"
					onClick={next}
					disabled={!isComplete}
					className={cn('flex items-center gap-2', current === 1 ? 'ml-auto' : '')}
				>
					Próximo <ChevronRight className="h-4 w-4" />
				</Button>
			) : (
				<Button type="submit" onClick={onSubmit} disabled={loading || !isComplete}>
					{loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
					Finalizar cadastro
				</Button>
			)}
		</div>
	);
}
