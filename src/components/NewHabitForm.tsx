import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

export function NewHabitForm() {
	const [title, setTitle] = useState('');
	const [weekDays, setWeekDays] = useState<Number[]>([]);
	const avaliableWeekDays = [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
	];

	async function handleCreateHabit(event: FormEvent) {
		event.preventDefault();
		console.log(title, weekDays);

		if (!title || weekDays.length === 0) {
			return;
		}

		await api
			.post('habits', {
				title,
				weekDays,
			})
			.then(() => {
				setTitle('');
				setWeekDays([]);
				alert('Hábito criado com sucesso!');
			});
	}

	function handleToggleWeekDay(day: number) {
		if (weekDays.includes(day)) {
			const weekDaysWithRemovedOne = weekDays.filter((weekDay) => weekDay !== day);
			setWeekDays(weekDaysWithRemovedOne);
		} else {
			setWeekDays([...weekDays, day]);
		}
	}

	return (
		<form onSubmit={handleCreateHabit} className="w-full flex flex-col mt-6 ">
			<label htmlFor="title" className="font-semibold leading-tight">
				Qual seu comprometimento ?
			</label>
			<input
				type="text"
				id="title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder="ex: Exercicios, dormir bem, etc..."
				autoFocus
				className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none  focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
			/>
			<label htmlFor="" className="font-semibold leading-tight mt-4">
				Qual a recorrencia
			</label>

			<div className="flex flex-col mt-3 gap-2">
				{avaliableWeekDays.map((day, index) => {
					return (
						<Checkbox.Root
							className="flex items-center gap-3 group focus:outline-none"
							key={day}
							checked={weekDays.includes(index)}
							onCheckedChange={() => handleToggleWeekDay(index)}
						>
							<div className="w-8 h-8 transition-colors  rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500   group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
								<Checkbox.Indicator>
									<Check size={20} className="text-white" />
								</Checkbox.Indicator>
							</div>
							<span className=" text-white leading-tight">{day}</span>
						</Checkbox.Root>
					);
				})}
			</div>

			<button
				type="submit"
				className="mt-6 rounded-lg p-4 transition-colors gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-green-500  focus:outline-none  focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
			>
				<Check size={20} weight="bold" /> Confirmar
			</button>
		</form>
	);
}
