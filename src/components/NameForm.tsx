import { i18n } from "../utils/i18n"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { cx } from "../utils/cx"

interface NameFormProps {
    value?: string
    onSubmit(name: string): void
}

export function NameForm({ onSubmit, value }: NameFormProps) {
    const edit = value !== undefined

    const [name, setName] = useState(value || "")
    const [valid, setValid] = useState(false)

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(name)
    }, [name, onSubmit])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const res = /^.{3,}$/.test(name)
        setValid(res)
        setName(name)
    }, [setName, setValid])

    return (
        <form
            className={cx("flex", edit ? "flex-row w-full gap-3" : "flex-col mx-auto max-w-xs gap-5")}
            onSubmit={submit}
        >
            <input
                type="text"
                placeholder={i18n("minThreeLetters")}
                autoFocus
                className={cx(edit ? "w-full" : "text-center")}
                value={name}
                onChange={onChange}
            />
            <button
                type="submit"
                disabled={!valid}
                className={cx("rainbow-button px-3", edit ? "save-icon" : "self-center")}
            >
                <span>{edit ? i18n("save") : i18n("start")}</span>
            </button>
        </form>
    )
}
