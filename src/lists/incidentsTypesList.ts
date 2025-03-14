import { EIncidentTypes } from '@/enums/EIncidentTypes';

export const INCIDENTS_TYPES_LIST = [
  {
    value: EIncidentTypes.ITS_PEDESTRIAN_ROAD,
    localeValue: "lists.incidentsTypes.pedestrianOnRoad",
    shortValue: "POR"
  },
  {
    value: EIncidentTypes.ITS_PEDESTRIAN_RESTRICTED_AREA,
    localeValue: "lists.incidentsTypes.pedestrianInArea",
    shortValue: "PRA"
  },
  {
    value: EIncidentTypes.ITS_PEDESTRIAN_LAWN,
    localeValue: "lists.incidentsTypes.pedestrianOnLawn",
    shortValue: "POL"
  },
  {
    value: EIncidentTypes.ITS_TRAFFIC_JAM,
    localeValue: "lists.incidentsTypes.trafficJam",
    shortValue: "TJM"
  },
  {
    value: EIncidentTypes.ITS_VEHICLE_ON_SIDEWALK,
    localeValue: "lists.incidentsTypes.vehicleOnSideWalk",
    shortValue: "SDW"
  },
  {
    value: EIncidentTypes.ITS_VEHICLE_STOP_RESTRICTED_AREA,
    localeValue: "lists.incidentsTypes.vehicleStopInArea",
    shortValue: "VRA"
  },
  {
    value: EIncidentTypes.ITS_VEHICLE_STOP_ROAD,
    localeValue: "lists.incidentsTypes.vehicleStopOnRoad",
    shortValue: "VOR"
  },
  {
    value: EIncidentTypes.ITS_VEHICLE_STOP_LAWN,
    localeValue: "lists.incidentsTypes.vehicleStopOnLawn",
    shortValue: "VOL"
  },
  {
    value: EIncidentTypes.ITS_POTENTIAL_CRASH,
    localeValue: "lists.incidentsTypes.suspectedCrash",
    shortValue: "PCH"
  },
  {
    value: EIncidentTypes.ITS_CONFIRMED_CRASH,
    localeValue: "lists.incidentsTypes.crash",
    shortValue: "CCH"
  },
  {
    value: EIncidentTypes.ITS_OPPOSITE_LANE_MOVEMENT,
    localeValue: "lists.incidentsTypes.wrongWay",
    shortValue: "OPS"
  },
  {
    value: EIncidentTypes.ITS_ANIMAL_ON_ROAD,
    localeValue: "lists.incidentsTypes.animalOnRoad",
    shortValue: "ANM"
  },
  {
    value: EIncidentTypes.ITS_ABRUPT_SPEED_DECREASE,
    localeValue: "lists.incidentsTypes.abruptInSpeed",
    shortValue: "ABR"
  },
  {
    value: EIncidentTypes.ITS_OVERSPEED_MOVEMENT,
    localeValue: "lists.incidentsTypes.speedng",
    shortValue: "OVS"
  },
  {
    value: EIncidentTypes.ITS_UNDERSPEED_MOVEMENT,
    localeValue: "lists.incidentsTypes.underspeedMove",
    shortValue: "UNS"
  },
  {
    value: EIncidentTypes.ITS_SMOKE,
    localeValue: "lists.incidentsTypes.smokeDetected",
    shortValue: "SMK"
  },
  {
    value: EIncidentTypes.ITS_FIRE,
    localeValue: "lists.incidentsTypes.fireDetected",
    shortValue: "FRE"
  },
  {
    value: EIncidentTypes.ITS_FALLEN_OBJECTS,
    localeValue: "lists.incidentsTypes.foreignObjectDetected",
    shortValue: "FLO"
  }
];
