"use client";

import React from "react";
import { ArrowRight, Award, DollarSign, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCombo } from "@/lib/actions/comboActions";
import Link from "next/link";
import { useLocale } from "@/LocaleContext";
import { DeleteComboBtn } from "./SubmitButtons";
import HighlightCombo, { autoRenovateHighlight } from "@/lib/actions/highlightActions";
import { User } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Combo } from "@/lib/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  comboId: z.string(),
  pathName: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const RenovateFormSchema = z.object({
  isAutoRenovate: z.boolean(),
  comboId: z.string(),
  pathName: z.string(),
});

type RenovateFormType = z.infer<typeof RenovateFormSchema>;

export default function MoreHorizontalBtn({
  combo,
  pathName,
  user,
}: {
  pathName: string;
  combo: Combo;
  user: User;
}) {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useTranslations("YourCombos");
  const t2 = useTranslations("CommentText");

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comboId: combo.id,
      pathName: pathName,
    },
  });

  const highlightConfigForm = useForm<RenovateFormType>({
    resolver: zodResolver(RenovateFormSchema),
    defaultValues: {
      isAutoRenovate: combo.isAutoRenovate,
      comboId: combo.id,
      pathName: pathName,
    },
  });

  const HighlightComboAction: SubmitHandler<FormType> = async (data) => {
    try {
      await HighlightCombo(data);
      toast.success("Combo Highlighted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const RenovateComboStatusAction: SubmitHandler<RenovateFormType> = async (data) => {
    try {
      await autoRenovateHighlight(data);
      toast.success("Combo Renovated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  console.log(highlightConfigForm.getValues("isAutoRenovate"));

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-slate-200 dark:hover:bg-stone-600 p-1 rounded-full transition-all">
          <MoreHorizontal width={18} height={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="p-1">
            <Dialog>
              <DialogTrigger className="w-full">
                <Button type="button" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black flex gap-1">
                  <Award width={18} height={18} />
                  <span>
                    {combo.highlight === "HIGHLIGHTED"
                      ? "Configurate"
                      : `${t("Highlight")}`}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {combo.highlight === "HIGHLIGHTED" ? (
                      <span className="text-amber-400">
                        {t("HighlightConfigurations")}
                      </span>
                    ) : (
                      <>
                        {t("ConfirmHighlight")}
                        <span className="text-amber-400">{t("ConfirmHighlight2")}</span>
                        {t("ConfirmHighlight3")}
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    {combo.highlight === "HIGHLIGHTED" ? (
                      <>
                        <Form {...highlightConfigForm}>
                          <form onSubmit={highlightConfigForm.handleSubmit(RenovateComboStatusAction)}
                            className="flex flex-col gap-2 mt-3">
                            <input type="hidden" name="comboId" value={combo.id} />
                            <input type="hidden" name="pathName" value={pathName} />
                              <FormField
                                control={highlightConfigForm.control}
                                name="isAutoRenovate"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base font-bold">
                                        {t("AutoRenovate")}
                                      </FormLabel>
                                      <FormDescription>
                                        {t("AutomaticallyRenovate")}
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        className=""
                                        checked={highlightConfigForm.watch("isAutoRenovate")}
                                        onCheckedChange={(value) => highlightConfigForm.setValue("isAutoRenovate", value)}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            <Button
                              className="bg-cyan-400 w-fit hover:bg-cyan-500 text-black"
                              type="submit"
                            >
                              {t2("Save")}
                            </Button>
                          </form>
                        </Form>
                      </>
                    ) : (
                      <>
                        {t("WhenHighlighted")}{" "}
                        <span className="text-green-600">{t("Features")}</span>
                        {t("HighlightTime")}
                        <Button
                          onClick={() => {
                            router.push(`/${locale}/`);
                            setTimeout(() => {
                              router.push(`/${locale}/#pricing-packs`);
                            }, 500);
                            const element = document.getElementById("pricing-packs");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          variant={"link"}
                          className="flex pl-0 items-center text-blue-500 gap-1"
                          type="button"
                        >
                          {t("CheckPacks")}
                          <ArrowRight className="text-blue-500" width={18} height={18} />
                        </Button>
                      </>
                    )}
                  </DialogDescription>
                </DialogHeader>
                {combo.highlight === "HIGHLIGHTED" ? (
                  null
                ) : (
                  <DialogFooter className="sm:justify-start">
                    {user.highlights >= 1 ? (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(HighlightComboAction)}>
                          <input type="hidden" name="comboId" value={combo.id} />
                          <input type="hidden" name="pathName" value={pathName} />
                          <Button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black"
                            type="submit"
                          >
                            <DollarSign width={18} height={18} />
                            {t("MakeHighlight")}
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        type="button"
                      >
                        {t("MakeHighlight")}
                      </Button>
                    )}
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <form action={deleteCombo}>
              <>
                <input type="hidden" name="comboId" value={combo.id} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteComboBtn />
              </>
            </form>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
