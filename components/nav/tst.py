import math

import matplotlib.pyplot as plt
import seaborn as sns


def plotGraph(x, y, title="Graph", xlabel="X-axis", ylabel="Y-axis"):
    """
    function to plot vertical height of heat guide against out temperature
    """
    sns.set_theme(style="whitegrid")
    plt.figure(figsize=(10, 6))
    plt.plot(
        x,
        y,
        marker="o",
        linestyle="-",
        color="#007acc",
        label="Relationship",
        alpha=0.8,
        linewidth=1,
        markersize=2,
    )

    plt.title(title, fontsize=18, fontweight="bold", color="#333")
    plt.xlabel(xlabel, fontsize=14, color="#555")
    plt.ylabel(ylabel, fontsize=14, color="#555")

    plt.grid(visible=True, which="major", linestyle="--", linewidth=0.6, alpha=0.7)
    plt.tick_params(axis="both", labelsize=12, colors="#555")

    # Show the plot
    plt.show()


# function to calculate the temp of the exhaust through the heat guide
def calcExhaustTemp(T1, M_dot, Cp, L, T_w):
    """
    T1 is the inlet tempof hte gas
    h_i is the initial distance from the  heat guide tip i.e assuming heat guide is a cone with top radius = 0
    M_dot the mass flow rate of the exhaust gas
    Cp specitfic heat of the exhaust gas
    L vertical length the heat guide covers
    """

    dl = 0.00001
    num_iterations = 0
    T = T1
    y = L  # vertical distance from the base of the heat guide to the current step
    C_l = 0  # keeps rescord of the current length of our iteratiion | verticl height we've covered
    tempOut = []
    incL = []

    """
    calculating R total of from exg to water in pot since
    we are taking the radius of pot to be constant so it does'nt have to  be recalculated in every step
    """

    R_conv_exg_0 = 1 / (h_exg * 2 * (math.pi * (r_e_p) * dl))  #
    R_cond_pot = math.log((r_e_p) / r_e_p - t_p) / (
        2 * math.pi * k_pot * dl
    )  # resistance through pot
    R_conv_w = 1 / (h_w * (math.pi * (r_e_p - t_p) * dl))  # resistance for water

    R_w = (
        R_conv_exg_0 + R_cond_pot + R_conv_w
    )  # total resistnace from exhaust gas to water, since water is already

    Q_hg_total = 0  # use to calculate the average rate of heat transfer to environment through heat guide
    Q_w_total = 0  # use to calculate the average rate of heat transfer to water

    while C_l < L:
        # firs calculate the R total of the heat guide have to do this for every step bcus the radius constantly increases
        r_i_sh1 = 1.1917 * (
            0.3542 - y
        )  # internal radius of heat guide at current step internal radius
        t_al_sh = 0.002  # (m) thcikness of aluminium sheet for heat guide
        r_i_ins = r_i_sh1 + t_al_sh  # internal radius of thermal insulator
        r_i_sh2 = r_i_ins + t_ins_sh  # internal radius of external sheet of heat guide

        R_conv_exg = 1 / (h_exg * 2 * (math.pi * r_i_sh1 * dl))
        R_cond_al = math.log((r_i_sh1 + t_al_sh) / r_i_sh1) / (2 * math.pi * k_al * dl)
        R_cond_th_ins = math.log((r_i_ins + t_ins_sh) / r_i_ins) / (
            2 * math.pi * k_ins * dl
        )
        R_cond_al = math.log((r_i_sh2 + t_al_sh) / r_i_sh2) / (2 * math.pi * k_al * dl)
        R_conv_air = 1 / (h_air * 2 * (math.pi * (r_i_sh2 + t_al_sh) * dl))

        R_total_conv = R_conv_exg + R_cond_al + R_cond_th_ins + R_cond_al + R_conv_air

        Q_hg = (T - T_amb) * (1 / R_total_conv)
        Q_w = (T - T_w) * (1 / R_w)
        Q_total = Q_hg + Q_w
        dT = Q_total / (
            M_dot * Cp
        )  # this is drop in temperature of the gas if given the rate of heat transfer

        # update datas for next step
        Q_hg_total += Q_hg
        Q_w_total += Q_w
        T -= dT  # update the temperature of the gas for the next step
        y -= dl  # for every step the distance from the cone tip increases which we need to calculate the new r of our heat guide
        num_iterations += 1
        C_l += dl
        incL.append(C_l)
        tempOut.append(T)
        """ print(
            "change in t",
            dT,
            "   new tempt::::::::",
            T,
            "   temp of water",
            T_w,
            "   c_l:::::",
            C_l,
            "   Q for heat guide:::: ",
            Q_hg,
            "   Q for water::: ",
            Q_w,
        )"""

    return [
        tempOut,
        incL,
        Q_hg_total / num_iterations,
        Q_w_total / num_iterations,
        T,
        Q_w_total,
        Q_hg_total,
    ]


T1 = 673  # (k) inlet temperature of gas which is equal to our t_adiabatic
M_dot = 0.0163  # (kg/s) mass flow rate of the exhaust gas same as mass flow rate through combustion chamber, neglecting the additional exhaust gasses from reaction
Cp = 1005  # (j/kg.k) specific heat capacity of the exhaust gas
L = 0.2  # (m) the vertical lenght of the heat guide from where the pot sits to the exit
T_w = 373  # (k) temperture of water, will assuming the watr is already booling
T_amb = 303  # (k) temperature of ambient air
r_e_p = 0.1  # (m) external radius of pot
t_p = 0.001  # (m) thickness of pot
k_pot = 230  # (w/m.k) thermal conductivity of pot, pot is aluminium
k_al = 230  # t(w/m.k) thermal conductivity of aluminium
k_ins = (
    0.03  # (W/m.k) thermal conductivity for insualator, our insulator is mineral wool
)
t_ins_sh = 0.02  # (m) thickness of insulator
h_exg = 80  # (W/m²K) convective heat transfer coefficient for exhaust gas, assuming hot air and it has a velocity
h_w = 2000  # (W/m²K) convective heat transfer coefficient for water, 100c assuming the water is alreday boiling
h_air = 15  # (W/m²K) convective heat transfer coefficient for ambient air


result = calcExhaustTemp(T1, M_dot, Cp, L, T_w)

print(
    "Averaeg heat flowrate through heat guide @ dl = 0.00001: ",
    result[2],
    "\nAverage heat flow rate to water @ dl = 0.00001: ",
    result[3],
    "\nOutput temperature: ",
    result[4],
    "\n Total Rate of heat transfer through pot wall to water: ",
    result[5],
    "\n Total rate of heat through through heat guide: ",
    result[6],
)

plotGraph(
    result[0],
    result[1],
    title="Graph of height of heat guide against output temp",
    xlabel="Output Temp (K)",
    ylabel="Heat guide heihgt (M)",
)
