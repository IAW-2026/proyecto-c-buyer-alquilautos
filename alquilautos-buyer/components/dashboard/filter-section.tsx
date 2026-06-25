type FilterSectionProps = {
	modelFilter: string;
	maxPriceFilter: string;
	onModelChange: (value: string) => void;
	onMaxPriceChange: (value: string) => void;
};

export default function FilterSection({
	modelFilter,
	maxPriceFilter,
	onModelChange,
	onMaxPriceChange,
}: FilterSectionProps) {
	return (
		<aside className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
			<h2 className="text-sm font-semibold">Filtros</h2>
			<div className="mt-4 grid gap-4 text-sm">
				<label className="flex flex-col gap-2">
					Modelo
					<input
						type="text"
						placeholder="Ej: Corolla"
						className="h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 outline-none focus:border-[var(--border-focus)]"
						value={modelFilter}
						onChange={(event) => onModelChange(event.target.value)}
					/>
				</label>
				<label className="flex flex-col gap-2">
					Precio maximo por dia
					<input
						type="number"
						placeholder="Ej: 25000"
						className="h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 outline-none focus:border-[var(--border-focus)]"
						value={maxPriceFilter}
						onChange={(event) => onMaxPriceChange(event.target.value)}
					/>
				</label>
			</div>
		</aside>
	);
}
