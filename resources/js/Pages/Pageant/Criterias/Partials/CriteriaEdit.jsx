import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CriteriaEdit({
    className = "",
    criteria,
    handleCancelEditMode = () => {},
}) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: criteria.name,
        round: criteria.round,
        percentage: criteria.percentage,
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        patch(route("criterias.update", criteria.id), {
            onSuccess: () => {
                alert("Success!");
                handleCancelEditMode();
                reset();
            },
        });
    };

    return (
        <section className={className}>
            <h2 className="uppercase font-bold">Edit</h2>
            <form onSubmit={submit}>
                <div className="my-2">
                    <div className="mt-4">
                        <InputLabel htmlFor="round" value="Round" />
                        <TextInput
                            className="w-full block"
                            id="round"
                            name="round"
                            value={data.round}
                            onChange={(e) => setData("round", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            className="w-full block"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="percentage" value="Percentage" />
                        <TextInput
                            className="w-full block"
                            id="percentage"
                            type="number"
                            name="percentage"
                            value={data.percentage}
                            onChange={(e) =>
                                setData("percentage", e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <PrimaryButton
                            type="button"
                            disabled={processing}
                            onClick={handleCancelEditMode}
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton disabled={processing}>
                            Update
                        </PrimaryButton>
                    </div>
                </div>
                <InputError message={errors.round} />
                <InputError message={errors.name} />
                <InputError message={errors.percentage} />
            </form>
        </section>
    );
}
